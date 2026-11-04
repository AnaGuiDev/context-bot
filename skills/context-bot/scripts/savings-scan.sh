#!/usr/bin/env bash
# Context Bot · savings-scan.sh
# Counts repeated task keys in tareas.log (no bot usage) and prints a <=10-line summary
# of keys done 3+ times in the last 30 days. Read-only: it never changes anything.
# Log format, one line per task:  YYYY-MM-DD | task-key | 3-8 word note
# Usage: bash savings-scan.sh [log] [days] [min]
LOG="${1:-/workspace/context-bot/tareas.log}"; DAYS="${2:-30}"; MIN="${3:-3}"
[ -f "$LOG" ] || { echo "savings-scan: no log yet ($LOG)"; exit 0; }
SINCE="$(date -d "-$DAYS days" +%F 2>/dev/null || date -v-"$DAYS"d +%F)"
OUT="$(awk -F'|' -v since="$SINCE" -v min="$MIN" '
  { d=$1; k=$2; n=$3; gsub(/^[ \t]+|[ \t]+$/,"",d); gsub(/^[ \t]+|[ \t]+$/,"",k); gsub(/^[ \t]+|[ \t]+$/,"",n)
    if (d=="" || k=="" || d<since) next; c[k]++; if (d>=last[k]) { last[k]=d; note[k]=n } }
  END { for (k in c) if (c[k]>=min) printf "%d\t%s\t%s\t%s\n", c[k], k, last[k], note[k] }' "$LOG" | sort -rn | head -9)"
if [ -z "$OUT" ]; then echo "savings-scan: nothing repeated ${MIN}+ times in the last ${DAYS} days"; exit 0; fi
echo "savings-scan: keys repeated ${MIN}+ times since $SINCE (count | key | last | last note)"
echo "$OUT" | awk -F'\t' '{printf "%sx | %s | %s | %s\n",$1,$2,$3,substr($4,1,60)}'
