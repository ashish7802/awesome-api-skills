# Find top 10 largest directories
du -ah / | sort -rh | head -n 10

# Check open ports
sudo ss -tuln

# Follow logs tail
journalctl -u my-service -f