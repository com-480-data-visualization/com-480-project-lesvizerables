# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Mari Sofie Lerfaldet| 311688|
| Vera Fristedt Andersson | 313051 |
| Thomas Bech Madsen | 320028 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### 1.1 Dataset
We choose to work with a dataset containing wine reviews that have been scraped from the website Wine Enthusiast in the end of 2017. Information that can be found in the dataset is country, province, region, winery and vineyard of where the wine is form, the grape variety, title, year, price and points of each wine and the taster's name and review description. The dataset is well structured and the quality of the data seems to be good. Some data is missing in the vineyard and price category but this information is not important for our project idea. The reviews are only of wines that have points 80 or more out of 100. Potential preprocessing of the data that could be done is to extract the year of the wine from the title or to retrieve keywords describing the wines from the reviews. We have not yet decided if this is of interest to us. The dataset can be found via the following link: https://www.kaggle.com/zynicide/wine-reviews.

### 1.2 Problematic
We want to visualize a map of France with its country regions and connect this to the information found in the wine reviews dataset. The map should be very clean with clear borders and when hovering over/clicking on a region, information about the wines from that region appears. For example, the different grape varieties grown in the region, how the wines usually rate from the region, usual keywords used to describe the wines, etc. We choose to work with France since it is the second largest wine-producing country in the world and because the information in the dataset regarding France is very clean, has little information missing and the information stored is easier to work with compared to for example United States. A more detailed decision process on how we decided to work with France can be found in the Jupyter Notebook file "ChoosingCountry.ipynb". 
    
We feel that when it comes to learning about wine, there is often too much information that provides little overview. When being a wine amateur, like ourselves, it is fun to learn more about wine but in a structured way. Having seen interactive maps that give information when hovering over/clicking on a region, we feel that this would be a fun way to explore wine. The target audience is people over 18 that enjoy wine and would like to learn some more about good wines in France.

### 1.3 Exploratory Data Analysis
All exploration explained with plots can be found in notebook [Milestone 1](Milestone1.ipynb). 

When exploring the data we first looked at varieties. Here we found that there is a lot of varieties that occur very few times in the data set. We therefore chose a threshold of a minimum of 30 occurrences, which gave us 35 different varieties. Next, we looked at the different wineries. Here we also chose to set a distribution at a minimum of 30 occurrences in the dataset to avoid data that is too sparse. We then ended up with 95 different wineries, which we feel should be enough for this visualization.  

Finally, we wanted to see if the cleaning of the dataset would have an impact on the missing values for Price and Designation. From the original dataset we could see that Price was reduced from 20% to 14% and Distribution from 35% to 19%. We therefore get the notion that the reduction is beneficial as the data that is left is more complete. On the other side, we saw that it had a negative effect on the provinces. The provinces with the most data (e.g. Bordeaux) now have the least. We therefore choose to use the non-reduced dataset for visualizing the provinces, and the reduced dataset for visualizing the wineries and varieties. 

Further we also wanted to explore the correlation between price and points. We therefore created a scatterplot which shows that in general more expensive wines have higher points. It also shows that most of the wines are concentrated in the left area of the plot, which means the prices are the same, but the points vary. From this we would like to visualize an option where the user can see wines at the same price/points but with different points/price. Another insight we got from making a scatterplot with average price and points by year is that the year might have a big impact on the quality of a wine. We therefore want to look further into visualizing how different years also have an impact on the points/price of the wines.  

By analysing the number of reviews for each wineyear we hope to gain insight into correlation between the reviews and the harvest year of the wine. We can see that there is a significant jump in the number of reviews in 2014. Perhaps it was a growth of interest in wine that year or an exceptional harvest that sparked the increase in reviews for that year. We also see that the number of reviews are sparse after about 10 years. Maybe wine of that age is harder to come by.

### 1.4 Related work
WineEnthusiast.com, the website where the data comes from, have tried something similar. They show a world map where all wine-producing countries are interactable. When clicking on a country, the user is redirected to a new website where a list is shown with all of their wine ratings from that country. However, the list shows an overwhelming amount of wines where it is possible to click on each wine type to get detailed information about it, but there are no summaries on the wines/regions/etc. from the chosen country. This is what we want to improve since no wine-amateur would be interested in going through a list like this. Wine-amateurs want to learn, but in an easier way that provides a good overview and not to much detail.
    
Another interactive visualization has been created with the dataset that we will be using. It lets the user choose a type of grape and a maximum price for wines with that grape, and it shows where those wines can be visualized on a world globe along with a list of the wines and a plot of cost versus rating. The visualization can be found on https://adodd202.shinyapps.io/wine-reviews/. Our visualization idea differs from this since we are only focusing on France, and aim to give a simple and easy understanding of the big picture of good quality wine from France. We will not be going into as much detail as listing all of the wine titles but rather show summaries of all the wine titles. 
    
Other than WineEnthusiast and the visualization mentioned, we have not been able to find similar work. The only interactive visualizations regarding wine, that we have found, are maps where only vineyards are marked out and nothing else. 

## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

