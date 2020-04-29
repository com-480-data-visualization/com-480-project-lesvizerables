# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Mari Sofie Lerfaldet| 311688|
| Vera Fristedt Andersson | 313051 |
| Thomas Bech Madsen | 320028 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### 1.1 Dataset
We choose to work with a dataset containing wine reviews that have been scraped from the website WineEnthusiast in the end of 2017. Information that can be found in the dataset is country, province, region, winery and vineyard (called designation) of where the wine is from, as well as the grape variety, title, year, price and points of each wine and the taster's name and review description. The dataset is well structured and the quality of the data seems to be good. Some data is missing in the designation and price category. The reviews are only of wines that have points 80 or more out of 100 and all reviews are done by sommeliers, and so we can assume that the reviews are impartial. Potential preprocessing of the data that could be done is to remove missing values, to extract the year of the wine from the title or to retrieve keywords describing the wines from the reviews. We have not yet decided if retrieving the keywords from the reviews are of interest to us. The dataset can be found via the following link: https://www.kaggle.com/zynicide/wine-reviews.

### 1.2 Problematic
We want to visualize a map of France with its country provinces and connect this to the information found in the wine reviews dataset. The map should be very clean with clear borders and when hovering over/clicking on a region, information about the wines from that region appears. For example, the different grape varieties grown in the region, how the wines usually rate from the region, usual keywords used to describe the wines, etc. We choose to work with France since it is the second largest wine-producing country in the world and because the information in the dataset regarding France is very clean, has little information missing and the information stored is easier to work with compared to for example United States. 
    
We feel that when it comes to learning about wine, there is often too much information that provides little overview. When being a wine amateur, like ourselves, it is fun to learn more about wine but in a structured way. Having seen interactive maps that give information when hovering over/clicking on a region, we feel that this would be a fun way to explore wine. The target audience is people over 18 that enjoy wine and would like to learn some more about good wines in France. The aim is to give a good overview and not to go to much into detail.

### 1.3 Exploratory Data Analysis
Exploration data with plots: [Milestone 1](Milestone1.ipynb)

When exploring the data we start with varieties and wineries. Many varieties/wineries occur very few times in the dataset. A threshold of minimum 30 occurrences is chosen, which gives 35 different varieties and 95 different wineries. We feel this should be enough for visualization.

Did the cleaning of the dataset impact the missing values for price and designation? Missing values in price is reduced from 20% to 14% and missing values in designation from 35% to 19%. Hence we get the notion that the reduction is beneficial as the data left is more complete. However, the cleaning has a negative effect on the provinces. Bordeaux, the province with most data, now has the second least amount of data. Hence, we choose to use the non-reduced dataset for visualizing the provinces, and the reduced dataset for visualizing the wineries and varieties. 

We explore the distribution of price/points for each province as well as the general correlation between them. This is shown using violin plots and scatter plots. We can see that more expensive wines in general have higher points. The scatterplot also shows that most wines are concentrated in the left area of the plot, meaning that most prices are similar, but the points vary. Next, a visualization where the user can see wines at the same price/points but with different points/price is created. This is shown with a scatterplot of average price and points by year. From this we gather that the year might have a big impact on the wine quality. 

By analyzing the number of reviews for each year we hope to gain insight on correlation between the reviews and the harvest year. Spiked values might indicate an exceptional harvest or a growth of interest in wine that sparked the increase in reviews for particular years. We also see that the number of reviews are sparse for wines that are 10 years or older. 

### 1.4 Related work
WineEnthusiast, the website where the data comes from, have tried something similar to our idea. They show a world map where all wine-producing countries are interactable. When clicking on a country, the user is redirected to a new website where a list is shown with all of their wine ratings from that country. However, the list shows an overwhelming amount of wines where it is possible to click on each wine type to get detailed information about it, but there are no summaries on the wines/regions/etc. from the chosen country. This is what we want to improve since no wine-amateur would be interested in going through a list like this. Wine-amateurs want to learn, but in an easier way that provides a good overview and not to much detail.
    
Another interactive visualization has been created with the dataset that we will be using. It lets the user choose a type of grape and a maximum price for wines with that grape and it shows where those wines exist, visualized on a world globe, along with a list of the wines and a plot of cost versus rating. The visualization can be found on https://adodd202.shinyapps.io/wine-reviews/. Our visualization idea differs from this since we are only focusing on France, and aim to give a simple and easy understanding of the big picture of good quality wine from France. We will not be going into as much detail as listing all of the wine titles but rather show summaries of all the wine titles. 
    
Other than WineEnthusiast and the visualization mentioned, we have not been able to find similar work. The only interactive visualizations regarding wine, that we have found, are maps where only vineyards are marked out and nothing else. 

## Milestone 2 (Friday 1st May, 5pm)

Visualization skeleton: https://com-480-data-visualization.github.io/com-480-project-lesvizerables/#story.

## Milestone 3 (Thursday 28th May, 5pm)


