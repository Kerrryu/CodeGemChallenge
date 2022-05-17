<img src="https://user-images.githubusercontent.com/17414278/79912332-dd36cd00-83ef-11ea-9e18-6e64d6586f4a.png" width="125" />

# Our Engineering Challenge 💎

### The Challenge

See: https://codegem.notion.site/Engineering-Challenge-fb62fc4e542d462da61e064deca014ea 

*Please also share any additional projects that you are proud of*

### Submission

- Please upload your submission here, and send an email to [stephanie@codegem.app](mailto:stephanie@codegem.app) to confirm you are finished.

### Notes

Resume development at 3:21 AM Tue May 17th 2022 since last push

Potential changes:
- When selecting a mood, remove emoji from context menu || (Very easy and quick add)
This was a very quick change which I implemented using a ternary conditional to check if the emoji was located in the selected list. I believe this cleans up the mood checker a little more and gives the user a cleaner experience

- Add placeholder to "Your findings" input field to avoid any confusion that they must type there 
Instead of adding a placeholder value here I simply removed the separate section being there and merged it with the original combo box selection. This doesn't confuse the user as first thing I thought was that I could type in the box "Your findings" but quickly found out I wasn't able to. To deliver a better user experience I merged this input area with the combobox container.

- Cleaned up some more css on the card to remove any weird looking whitespace or issues that are there.

Answers to questions about challenge:
- This took around 5 hours of development time total
- I learnt some that there is always room for improvement when it comes to user experience, I experienced this when adding some small quality of life changes like the emoji selector removing emojis after they have been selected.
- I had a debate of implementing bootstrap via reactstrap so that I can get the 3 boxes on the diary page to be side by side just like in figma but due to time constraints this was going to require some more work such as moving things around and making sure the content in the boxes fit as when I tried it only fit 2 boxes side by side which means some adjustments would be required.
- For sure sync the volume for the docker container for api, this would make it faster to test endpoints and allow for faster testing as opposed to rebooting the container every time to apply changes. Same thing for the database, I would introduce migration files to help with modifying table structures as I needed to take down the docker container completely to rebuild it after making a modification to the sql file.
- If I had more time I would've implemented the calendar system, improved the styling a ton especially with a common library like bootstrap or such to help organize things better and make it look nicer overall. I would've also made the diary page more interactive so you can access data more and even remove feedback you may no longer want or you don't want managers to see due to accidental submission.