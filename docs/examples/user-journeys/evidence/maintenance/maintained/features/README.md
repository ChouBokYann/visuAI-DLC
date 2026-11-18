# Project flow feature map

Run the [project recipe](../SKILL.md) from the checked-out repository. All features use the owned server, synthetic fixture and private browser created by run.mjs. Evidence belongs to that run's directory and survives cleanup.

| Feature ID | User behavior | Entry |
|---|---|---|
| export-records | Export authored records to a readable snapshot | [CLI export](export-records.md) |
| import-inspect | Import that snapshot and inspect its summary | [Import and inspect](import-inspect.md) |
| reject-invalid | Reject malformed input and retain the loaded snapshot | [Reject invalid input](reject-invalid.md) |

Maintenance must check all three entries. Use the scope limits in the project recipe when reporting broader coverage.
