#!/bin/bash
# check-env.sh

# Function to check if a variable exists in .env.local
check_env_var() {
    local var_name=$1
    if ! grep -q "^${var_name}=" .env.local 2>/dev/null; then
        echo "Error: ${var_name} is not set in .env.local"
        exit 1
    fi
}

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Error: .env.local file not found"
    exit 1
fi

# List of required environment variables
required_vars=(
    "AUTH_SECRET"
    "AUTH_GOOGLE_ID"
    "AUTH_GOOGLE_SECRET"
    "VERSION"
)

# Check each required variable
for var in "${required_vars[@]}"; do
    check_env_var "$var"
done

echo "✅ All required environment variables are set"
exit 0