# Bye Bye Bias
A chrome extension that encourages more holistic news article consumption by recommending articles from similar or opposing viewpoints.
## Motivation
In an age where most of our media consumption is online, it is important to recognize the danger of recommendation algorithms when it comes to the news. Too often, we end up reading articles upon articles which all share the same perspective, leading to the proliferation of hyperpartisanship in society. Unbias Me was designed to help readers easily consider similar and opposing viewpoints on the same issue by providing easy access to related articles. We hope Unbias Me can encourage people to become more informed about bias in the media so that they can fight it accordingly.
## What Does it Do?
Unbias Me is a chrome extension which can be used on any news article online. It provides two options for the user: Similar or Opposing. By clicking the respective button, Unbias Me generates up to ten articles on the same topic from news sources which either share or differ in perspective/bias. Clicking on an article link will then bring the user to a new tab, allowing a seamless transition from one article to the next.
## How We Built it
We used HTML, CSS, and Javascript for the front end to achieve a look that is both simple and clear. We incorporated the Custom Search JSON API to search Google for articles and filtered the results based on the leanings of the current active tab. 
## Challenges We Faced
None of us had experience creating chrome extensions, so we all had to learn the new framework and components required from scratch. We also had trouble figuring out how to send data between the background and script files. For three of us, it was our first hackathon. 
## Future Directions
To improve our extension, we can include functionality to scrape the current article for information about what sort of bias is present and possible misinformation in the article. It would also be interesting to be able to categorize articles more specifically than just "Similar" or "Opposing". 
