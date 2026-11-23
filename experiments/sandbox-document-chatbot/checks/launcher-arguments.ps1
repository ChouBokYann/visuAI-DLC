$ErrorActionPreference = 'Stop'
function CaptureArguments { return ,$args }
$broken = CaptureArguments run --mount source=e11-gateway-state,target=/state image
if ($broken[2] -isnot [array]) { throw 'Expected reproduction of PowerShell comma-array parsing' }
$fixed = CaptureArguments run --mount 'source=e11-gateway-state,target=/state' image
if ($fixed.Count -ne 4 -or $fixed[2] -ne 'source=e11-gateway-state,target=/state') { throw 'Mount argument is not preserved' }
$source = Get-Content "$PSScriptRoot/start-infrastructure.ps1" -Raw
if ($source.Contains('--mount source=') -or $source.Contains('--mount type=')) { throw 'Unquoted mount remains' }
Write-Output 'PASS: reproduced array expansion; quoted mount stays one string. No Docker commands executed.'
