# My App

CO2 and Greenhouse Gas Emissions Viewer

## Performance Profiling

Initial profiling was performed using **React DevTools Profiler**.

**Tested interactions:**
- Changing a year
- Changing sorting attribute
- Changing sorting direction
- Searching for a country
- Adding/removing columns

## Before optimization

### Changing a year (User selects a different year from the input; table highlights updated values)
- **Committed at: 1.6s**
- **Render Duration: 81ms**
### - Screenshots: 
![change year Flamegraph](public/image.png)
![change year Ranked](public/image-1.png)

### Changing sorting attribute (User changes sortKey from `name` to `population`)
- **Committed at: 1.9s**
- **Render Duration: 94ms**
### - Screenshots: 
![change sorting attribute Flamegraph](public/image-2.png)
![change sorting attribute Ranked](public/image-3.png)

### Changing sorting direction (User changes sortOrder from `asc` to `desc`)
- **Committed at: 2.2s**
- **Render Duration: 93ms**
### - Screenshots: 
![change sorting direction Flamegraph](public/image-4.png)
![change sorting direction Ranked](public/image-5.png)

### Searching for a country (User types a country name in the search bar; table filters results)
- **Committed at: 1.5s**
- **Render Duration: 14ms**
- **LayoutEffects: 1ms**
### - Screenshots: 
![Searching for a country Flamegraph](public/image-6.png)
![Searching for a country Ranked](public/image-7.png)

### Adding table columns (User opens modal and selects additional columns)
- **Committed at: 0.9s**
- **Render Duration: 4ms**
- **LayoutEffects: 2ms**
### - Screenshots: 
![Adding table columns Flamegraph](public/image-9.png)
![Adding table columns Ranked](public/image-8.png)

### Removing table columns (User opens modal and deselects additional columns)
- **Committed at: 1.4s**
- **Render Duration: 4ms**
- **LayoutEffects: <0.1ms**
### - Screenshots: 
![Removing table columns Flamegraph](public/image-10.png)
![Removing table columns Ranked](public/image-11.png)

## After optimization

### Changing a year (User selects a different year from the input; table highlights updated values)
- **Committed at: 1.2s**
- **Render Duration: 57ms**
### - Screenshots: 
![Changing a year Flamegraph](public/image-12.png)
![Changing a year Ranked](public/image-13.png)

### Changing sorting attribute (User changes sortKey from `name` to `population`)
- **Committed at: 2s**
- **Render Duration: 47ms**
### - Screenshots: 
![change sorting attribute Flamegraph](public/image-14.png)
![change sorting attribute Ranked](public/image-15.png)

### Changing sorting direction (User changes sortOrder from `asc` to `desc`)
- **Committed at: 1.7s**
- **Render Duration: 48ms**
### - Screenshots: 
![change sorting direction Flamegraph](public/image-16.png)
![change sorting direction Ranked](public/image-17.png)

### Searching for a country (User types a country name in the search bar; table filters results)
- **Committed at: 1.6s**
- **Render Duration: 9ms**
- **LayoutEffects: 4ms**
### - Screenshots: 
![Searching for a country Flamegraph](public/image-18.png)
![Searching for a country Ranked](public/image-19.png)

### Adding table columns (User opens modal and selects additional columns)
- **Committed at: 0.8s**
- **Render Duration: 1ms**
- **LayoutEffects: <0.1ms**
### - Screenshots: 
![Adding table columns Flamegraph](public/image-20.png)
![Adding table columns Ranked](public/image-21.png)

### Removing table columns (User opens modal and deselects additional columns)
- **Committed at: 1.1s**
- **Render Duration: 8ms**
- **LayoutEffects: <0.1ms**
### - Screenshots: 
![Removing table columns Flamegraph](public/image-22.png)
![Removing table columns Ranked](public/image-23.png)

## Analyzing results

### Action taken: 
- Several components were wrapped in memo(TableRow, TableBody, CountriesList, ControlsPanel)
- Objects were memoized with useMemo in TableBody and CountriesList
- useCallback was used to memoize controls panel functions

### Before optimization:
- Large components (TableRow for ~220 countries) re-rendered on almost every interaction
- Sorting and changing the year were the most expensive operations (~94ms)

### After optimization:
- Most components only re-render when necessary
- Render durations decreased by ~30–50ms per interaction
- Searching, adding, or removing columns became nearly instant (<5ms)

### Conclusion: 
- Using `React.memo`, `useMemo`, and `useCallback` increased overall performance of the app for a large database

