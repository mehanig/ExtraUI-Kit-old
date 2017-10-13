# EXTRAUI-KIT
Set of independent React styled components made to mimic Adobe AfterEffects user experience.

### How to use
`npm install extraui-kit`

### Codestyle

run tslint from main directory

`tslint src/**/*.ts{,x} --fix` 


##List of components


### Button

### Checkbox

### RadioButton

### ValueSlider

### TabMenu


## List of Icons

  - AngleIcon
  - ColumnIconActive
  - ColumnIconInactive
  - CircleIconActive
  - CircleIconInactive
  - CubeIconActive
  - CubeIconInactive
  - DimensionsIcon
  - RadiusIcon
  - RotateIcon
  - RotationsRActive
  - RotationsRInactive
  - RotationsLActive
  - RotationsLInactive
  - RowIconActive
  - RowIconInactive
  - SpacingX
  - SpacingY
  - SpiralIcon
  - SquareIconActive
  - SquareIconInactive


### Extras

Python can be used to converting image icons to base64

```
import base64

with open("YourPngImage.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())
with open("YourPngImageInTXT.txt", "w") as image_out:
    image_out.write(encoded_string)
```