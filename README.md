https://a3-lucasmarble-production.up.railway.app

The goal of the application is to store hurricane data. It works pretty much identically to how it did in A2. However, each storm now belongs to a different user, which means that multiple users can put in the same storm information. I wanted to do this because multiple organizations have different measurements of storms that don't always quite agree. In order to login, you must provide the correct username and password. If you put in a username that does not exist, it will automatically register a new account. If you put in a username that does exist, but the wrong password, it will alert you saying that you put in invalid login details. The biggest challenges were definitely understanding exactly how to use express, mongodb, and how to implement authentication. I ended up uses a simple cookie and storing the login information within the database because it was the easiest solution. I went with the tufte framework because I really like the beige look to it and makes it seem more authentic and academic, which is what I'm going for. The only modifications I made is the color of the data depending on what category the storm is.

An image of the evaluation is also provided in the depository, just for proof because I've noticed that sometimes the evaluation numbers change.

Achievements:

I ended up using Railway instead of Render to deploy the project. Railway was certainly a lot faster and easier to use, but with a new UI, it was a bit hard to navigate at first.

I added a log off feature that allows users to go back to the login page and reenter any login credentials. It wasn't very tricky, but I did have to make sure the server knew that the user had logged out, and updated the current logged user and cookie as a result.

I decided to use handlebars for easier text display for the login information. This was incredibly frustrating as there were multiple times it did not like redirecting or rendering a new page, and I had to be incredibly methodical to make sure it worked.
