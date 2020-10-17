# Ipl Dashboard
Task from atlan
using data from = https://www.kaggle.com/saurav9786/indian-premier-league-match-analysis 


heroku hosted frontend = https://ipldash-atl.herokuapp.com/


backend express API = https://ipldash-back.herokuapp.com/

# Tools and lib used!

  - Vue.js - frontend framework.
  - styling by vanilla CSS
  - axios requesting data from backend 
  - chart.js + vue-chartjs - drawing bar and pie charts
  - localforage - caching data, client side


bonus point stuff:
  - Vuejs used.
  - lazy loading components and doing most of styling with CSS  - 4 sec for first load(if dynos are sleeping), shorter loading times after everything is cached and dynos wake up(I'm using free heroku dynos).
  - Css grid , css media queries, conditional styling with javascript, makes it mobile responsive.
  - vue does that (run: "vue pwa" then its done, not the most optimized implementation but sure the simplest).
  - included benifits with "vue pwa" makes it offline usable with cached data using localforage.
 
lighthouse results:
![Alt text](/../main/screeshots/localhost.png?raw=true "Optional Title")



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
