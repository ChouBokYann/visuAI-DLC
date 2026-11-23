param([Parameter(Mandatory=$true)][int]$RootPid)
$ErrorActionPreference = 'Stop'
$snapshot = @(Get-CimInstance Win32_Process)
$owned = @($snapshot | Where-Object { $_.ProcessId -eq $RootPid })
if ($owned.Count -eq 0) { exit 0 }
do {
    $ids = @($owned | ForEach-Object { $_.ProcessId })
    $children = @($snapshot | Where-Object { $_.ParentProcessId -in $ids -and $_.ProcessId -notin $ids })
    $owned += $children
} while ($children.Count -gt 0)
$ErrorActionPreference = 'Continue'
& taskkill /PID $RootPid /T /F 2>&1 | Out-Null
$ErrorActionPreference = 'Stop'
Start-Sleep -Milliseconds 100
$remaining = @(Get-CimInstance Win32_Process | Where-Object { $current=$_; @($owned | Where-Object { $_.ProcessId -eq $current.ProcessId -and $_.CreationDate -eq $current.CreationDate }).Count -gt 0 })
if ($remaining.Count -gt 0) { throw 'Owned process tree termination could not be confirmed' }
exit 0
