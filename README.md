# Journ.io
***Facebook Itinerary WebApp/iOS/Pebble***

***NOTE:*** *Due to domain restrictions from Facebook, while in development, testing only functions on `localhost:8080`.  This will change upon final deployment.*

##Goal: 

Itinerary builder that utilizes the FB Graph API to load up event information, display it in itinerary form with expandable information, location data, and tickets stored.  Comes with an iOS application for when youu're actually traveling, and a Pebble app for when you're walking through an airport with your hands full.  And because it uses your FB events, it comes with all the added benefits of automatic Facebook bragging :)  Could be expanded to store uploaded pictures from each event, or from the trip as a whole!

### Tech

- Facebook Graph API
- AngularJS
- Express
- Sass
- Handlebars
- Swift

### Notable Limits:

- No posting to Events through Graph... you must create events directly on facebook.
- Need to learn Swift more in-depth to accomplish stretch goals

====

### Tier 1 (MVP) - Web App with Angular

- Displays events in date order
- Expandable details (invitees, location, time, description, etc)
- hide irrelevant events
- mobile first design

### Tier 2 - Expanded Web App

- Add files that store to each event object (tickets, reservation confirmation, etc)
- Search events by name, location, anything.
- upload pictures to each individual event

### Tier 3 - Native Mobile Application with Swift

- Displays your events in the same way the web-app does
- Persists data cross-platform (Which means I need to store user settings) (example of persisted data: Irrelevant events array, etc)
- View uploaded files locally on the phone

### Tier 4 - Mega Mobile

- Integrate tickets with Passbook
- Upload photos from mobile

====

##Wireframes

Index
![image](http://i.imgur.com/0w2pGij.png)

Show
![image](http://i.imgur.com/uVmUp9p.png)

Mobile
![image](http://i.imgur.com/xDlFvT2.png)
