param([switch]$NoInference)
$ErrorActionPreference = 'Stop'
function DockerChecked { & docker @args; if ($LASTEXITCODE -ne 0) { throw "Docker step failed: $($args[0])" } }
$trialRoot = (Get-Location).Path
DockerChecked network create --label visuai.experiment=e11 e11-control
DockerChecked volume create --label visuai.experiment=e11 e11-gateway-state
$volumePath = (& docker volume inspect e11-gateway-state --format '{{.Mountpoint}}').Trim()
$gatewayImage = 'ghcr.io/nvidia/openshell/gateway@sha256:1fd9e1e807990e66c9486a28d3ce9d649fd7528df48d0e830d2de2148b52dfe5'
DockerChecked run --rm --name e11-init --label visuai.experiment=e11 --user 0:0 --mount 'source=e11-gateway-state,target=/state' $gatewayImage generate-certs --output-dir /state/tls
$config = Get-Content '../../../e09-worktree/experiments/workflow-compatibility/records/docker/gateway.toml' -Raw
$config = $config.Replace('e09','e11').Replace('17679','17689').Replace('/var/lib/docker/volumes/e11-gateway-state/_data',$volumePath)
[IO.File]::WriteAllText("$trialRoot/records/gateway.toml",$config)
DockerChecked create --name e11-gateway --label visuai.experiment=e11 --user 0:0 --network e11-control -p 127.0.0.1:17689:17670 --mount 'type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock' --mount "source=e11-gateway-state,target=$volumePath" -e "HOME=$volumePath" -e "XDG_DATA_HOME=$volumePath" -e "OPENSHELL_DB_URL=sqlite:$volumePath/gateway.db?mode=rwc" -e OPENSHELL_TELEMETRY_ENABLED=false $gatewayImage --config /tmp/gateway.toml
DockerChecked cp records/gateway.toml e11-gateway:/tmp/gateway.toml
DockerChecked start e11-gateway
DockerChecked run -d --name e11-cli --label visuai.experiment=e11 --network e11-control ubuntu@sha256:fe81560990fae86dc4743202b2cb4d3df98d0bcf949173cecef15ce1127ef852 sleep infinity
DockerChecked cp ../../../e09-worktree/experiments/workflow-compatibility/records/docker/openshell e11-cli:/usr/local/bin/openshell
DockerChecked exec e11-cli chmod +x /usr/local/bin/openshell
if (-not $NoInference) {
$nodeExe = (Get-Command node).Source
$hostProcess = Start-Process -FilePath $nodeExe -ArgumentList 'host.mjs' -WorkingDirectory $trialRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput "$trialRoot/evidence/host-stdout.txt" -RedirectStandardError "$trialRoot/evidence/host-stderr.txt"
$hostProcess.Id | Set-Content records/host-pid.txt
}
