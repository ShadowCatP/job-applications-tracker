echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "main" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi