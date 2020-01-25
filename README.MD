# Gitcoin Quest Scraper
> A tool* to analyze the total points you can get by completing all [Gitcoin Quests](https://gitcoin.co/quests) for the Round 3 Challenge

Go straight to conclusions if you want to know the results


## Setup 
To use the gitcoin quest scraper yourself:

1) clone this repo.

```
git clone repolink.here\repo.git        
```

2) Then inside the repo run the following commands to install dependencies.

```
npm install
```

We use [Request](https://www.npmjs.com/package/request) and [Cheerio](https://www.npmjs.com/package/cheerio) to crawl gitcoin and dissect the responses respectively.

3) You'll also need to have [python3](https://www.python.org/downloads/) installed 

## Usage
1) the first step to using this program is to get the data. run ``` node scraper.js``` to create a ```quests.csv``` file with the quests ID, value, and name. See Note(6) at the bottom to understand the different quest error codes

2) run ```python3 analyze.py``` to calculate the total value of all the quests we scraped.







## Conclusions
By my estimates the total points you can get starting today for the third round of competition is ```189``` (this is 23 points from special quizzes, where you join a hackathon to enable them, and 166 from normal quizzes). Since the current player in third place has over 250 points I've decided to stop doing the quizzes. New players can't win as past players completion of old quizzes is to heavily weighted.





#### Notes
1. If you look in ```scraper.js``` you can see that we only get the first 200 possible quests, right now it seems like there are only ~90 that acutally exist.
2. There is a lot of commented out code in ```scraper.js``` that gathers quest names by looking at completed quests on the profile in first place at the time of writing. Originally I thought I would have to use these to build the urls to scrape but this turned out to not be the case.

3. if you look in ```analyze.py``` you'll see a commented out section about values from locked pages. I got these manually by visiting the pages while logged in.
4. All of the data here is probably owned by gitcoin. I don't think these quests are published on a blockchain like their bounties and instead seem to sit on a postgres db.
5. old-quests.csv is the data I got when I used this tool.
6. ```😭😭Error page😭😭``` means this page returned a error code like 404. ```😭😭locked page😭😭``` means we got redirected to the leaderboards. To view locked pages you have to be logged in and join the hackathon connected to it. If you visit in the browser it will tell you what hackathon to join. ```😭😭otherwise broken😭😭``` means we got a quest game page but couldn't parse the data out of it. This will likely become the case for all the pages if the design of the game page is changed dramatically.

*a brittle tool in the sense that it pulls data directly from gitcoin.co/quests pages and will break as soon as these pages undergo a major design change.