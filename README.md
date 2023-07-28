# Project 3
Topic: Incidence of Malaria Worldwide 

Members: Kokoe Amegno, Olivia Ramsey, Joanna Santana, Aaron Schneberger, Cayla Valentine

Description: Malaria is a disease caused by a plasmodium parasite, transmitted by the bite of infected mosquitoes.The disease symptoms are chills, fever, and sweating, usually occurring a few weeks after being bitten.In 2021 alone, there were 247 millions malaria cases with 619000 deaths. People traveling to areas where malaria is common typically take protective drugs before, during, and after their trip. Treatment includes antimalarial drugs.

The project primary goal is to identify countries that are most affected by this disease and how the case has changed over the years.These visualizations are beneficial when making travel decisions and help the international medicine community focus their resources to the most affected areas.

Developed with:Python,Leaflet,HTML,CSS,Javascript and D3.

Scripts and files to demonstrate the project's key features includes:

ETL_Project_3.ipynb houses ETL of the data :we extracted the data from WHO.com; transformed it into approppriate formats and converted the results into Pandas dataframes. 

Later, we loaded the cleaned data into a SQLite database.  

app.py to create the flask app  and flask_to_json.ipynb to convert the flask result into a json file. 

logic.js
  Using Chart.js, we created a dynamic line chart that plots malaria rates over time which can be utilized to compare 2 countries/destinations.
  Using Choropleth.js, we created a map that illustrates malaria cases per country and region.
  Using Javascript, we created a top 10 dropdown menu of countries with highest malaria cases. 

index.html contains the webpage contents and accesses all the libraries being used in the dashboard

CSS that controls the user interface and webpage styling.  

Project visualizations:

Malaria cases per country and region - When hovering over a country, stats appear in a textbox.

/Users/v.k.a/Desktop/image (1).png
A dropdown menu that allows you to select 2 unique countries for malaria rates over time (2000-2021) on a line chart. 

/Users/v.k.a/Desktop/image (3).png

/Users/v.k.a/Desktop/image (4).png

A list of top 10 countries with highest malaria rates that refreshes.

/Users/v.k.a/Desktop/image (2).png


Data source: https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/malaria-cases-deaths

Presentation link: 
https://docs.google.com/document/d/1uojEmlbSdjV-KnB4HSMMliw7Dlq5syEeOXU6cyIMT0k/edit

To learn more about malaria,visit World Malaria Report 2022: https://www.who.int/publications/i/item/9789240064898
