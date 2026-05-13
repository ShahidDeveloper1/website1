$file = 'c:\Users\Sajida Randhawa\Desktop\fancysymbols\all-symbols.html'
$lines = Get-Content $file
$filtered = $lines | Where-Object { $_ -notmatch 'flag-item|flag-name|fi fi-' }
$filtered -join "`n" | Set-Content $file -Encoding UTF8
Write-Host "Done. Lines remaining: $($filtered.Count)"
