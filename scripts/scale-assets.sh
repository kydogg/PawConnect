#!/bin/bash
# PawConnect Asset Scaler
# ========================
# Finds every *@3x.png in the target folder (recursively),
# creates @2x and @1x versions using sips (built into macOS).
#
# Usage:
#   chmod +x scale-assets.sh
#   ./scale-assets.sh PawConnect-Assets-Staging/
#
# Workflow:
#   1. Generate in Midjourney at @3x size
#   2. Save as [Name]@3x.png in staging folder
#   3. Run this script
#   4. Drag @1x, @2x, @3x into Xcode asset catalog

FOLDER="${1:-.}"

if [ ! -d "$FOLDER" ]; then
    echo "❌ Error: '$FOLDER' is not a directory"
    echo "Usage: ./scale-assets.sh path/to/staging/folder"
    exit 1
fi

count=0

find "$FOLDER" -name "*@3x.png" | sort | while read file; do
    dir=$(dirname "$file")
    base=$(basename "$file" @3x.png)
    
    # Get @3x dimensions
    width_3x=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')
    height_3x=$(sips -g pixelHeight "$file" | tail -1 | awk '{print $2}')
    
    # Calculate @2x (2/3 of @3x)
    width_2x=$(( width_3x * 2 / 3 ))
    height_2x=$(( height_3x * 2 / 3 ))
    
    # Calculate @1x (1/3 of @3x)
    width_1x=$(( width_3x / 3 ))
    height_1x=$(( height_3x / 3 ))
    
    echo "📦 Processing: ${base}@3x.png (${width_3x}×${height_3x})"
    
    # Generate @2x
    output_2x="${dir}/${base}@2x.png"
    if [ ! -f "$output_2x" ]; then
        sips -z $height_2x $width_2x "$file" --out "$output_2x" > /dev/null 2>&1
        echo "   ✅ @2x: ${width_2x}×${height_2x}"
    else
        echo "   ⏭️  @2x already exists, skipping"
    fi
    
    # Generate @1x
    output_1x="${dir}/${base}@1x.png"
    if [ ! -f "$output_1x" ]; then
        sips -z $height_1x $width_1x "$file" --out "$output_1x" > /dev/null 2>&1
        echo "   ✅ @1x: ${width_1x}×${height_1x}"
    else
        echo "   ⏭️  @1x already exists, skipping"
    fi
    
    echo ""
    count=$((count + 1))
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Done. Processed all @3x assets."
echo ""
echo "Next steps:"
echo "  1. Open Xcode → Assets.xcassets"
echo "  2. Create image sets matching the names"
echo "  3. Drag @1x, @2x, @3x into each slot"
echo "  4. For template icons: Inspector → Render As → Template Image"
