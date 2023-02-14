<!-- Setting up a reliable benchmarking machine -->
<!-- Programming -->
<!-- Benchmarking -->
<!-- A simple guide to setting up cpu shielding on your local system for benchmarking. -->
<!-- 09-12-2021 -->

This is the script I use to set up core shielding on my i7 12700k, variance is typically less than 0.5% with perf which is expected (https://llvm.org/docs/Benchmarking.html).
One can turn off power saving features and disable cores from terminal but I rather prefer doing that in bios.
You can directly use this script to enable core shielding (don't worry if it doesn't work, the shields are reset on reboot in case it doesn't work)


```bash
#!/bin/bash
​
# Ref: https://llvm.org/docs/Benchmarking.html
​
if [ "$EUID" -ne 0 ]
  then echo "Please run this script as root"
  exit
fi
​
#
# 1. Disable Address Space Randomization
#
​
echo 0 > /proc/sys/kernel/randomize_va_space
​
#
# 2. Set scaling_governor to performance, by default it is powersave
# https://docs.oracle.com/cd/E37670_01/E36387/html/ol_aslr_sec.html
#
​
function setgov ()
{
    echo "$1" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor 
}
​
setgov performance 
​
#
# 3. Shield specific cpu cores, if this throws an error there might be existing cpu sets,
#	deleting existing cpu sets is safe and does not cause any adverse affects 
#	(NOTE, cpuset 'root' will always exist and cannot be deleted)
#	other cpusets can be deleted using 'sudo cset set -d docker', where docker is the name of the cpuset
#
​
cset shield -c 0-7 -k on
​
# Print the cpusets
echo "=== available cpusets after shielding, there should be root, system and user ==="
cset set
​
#
# 4. Disable SMT (Simultaneous Multi Threading), better to disable it in the bios
#
​
# echo 0 > /sys/devices/system/cpu/cpuX/online
​
#
# 5. Disable turbo boost, better to disable it in the bios
#
​
# echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo

```


You can now run your programs in the shielded cores using.

```
# Can also use perf to get more reliable measurements
cset shield --exec -- perf stat -r 10 <cmd>
```