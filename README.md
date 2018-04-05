# simple-charting-js-app

## [Live Example](https://ardi-n.github.io/simple-charting-js-app/public/index.html)

An example JS app showing integration of Backbone/Marionette with d3.js where the chart data is partly fetched from the server and adjusted in real time thanks to some controls.

There are two components that form a larger panel. The component on top integrates some dynamic information (current date) and some high level configuration inputs. Here a user can view the current date and select a visualization period (3, 6, 12 months) for her data. She can also choose one of two models of growth (linear or exponential). If she chooses exponential she gets an extra input field where she is prompted for a multiplier ratio (e.g. 1.5x).

The second component below contains two input fields (a value and a slider) and a dynamic line graph. The graph presents the output for the parameters selected.

A user begins by choosing a timeframe (e.g. 5 months) from which she is going to get a projection starting from the current date. This projection will be extrapolated from the current value and the type of growth. The slider allows the user to change the forecast value in real time.

## Running locally

First, run `npm install`.

The app can be either run exclusively in the browser locally - you just need to call `npm run start`. It builds assets and starts a development server on port 1234. In this mode forecast is generated on the client.

Otherwise you can `npm run start-server` which builds the assets for production
and starts the server on port 3000. In this setup forecast is fetched from the server.

Forecast-generating function is shared between server and front-end client.

## About the author

My name is Adrian Nowicki. You can contact me through 
[LinkedIn](https://www.linkedin.com/in/adriannowicki/)
and [Twitter](https://twitter.com/MeNowicki). 
Some of my work is published on [Github](https://github.com/ardi-n).

By the way, I'm the founder of 
[Livewallpaper.io](https://www.livewallpaper.io),
a place for awesome Android phone wallpapers. If you wonder how to turn
a gif or an mp4 into a live wallpaper, 
you can find the answer [here](https://www.livewallpaper.io/how-it-works).
