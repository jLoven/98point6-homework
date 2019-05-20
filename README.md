Author: Jackie Loven / Date: 19 May 2019

#### View 98point6 Frontend Homework: http://jackieloven.com/98point6-homework/

## Open questions for PMs + designers
- What are customers' preferred browsers? *Currently, the design does not support Internet Explorer 10 and older.*
- What do mocks for mobile and desktop experiences look like? *Current [desktop experience](https://github.com/jLoven/98point6-homework/blob/master/screenshots/screenshot_desktop.png) and [mobile experience](https://github.com/jLoven/98point6-homework/blob/master/screenshots/screenshot_mobile.png) screenshots.*
- How often is the service unavailable, and what should be shown to users when it is down? *Currently, testing showed that the service was not commonly unavailable, so Ajax retries have not been imlemented.*
- In what ways can the copy be updated to be more clear about the rules and gameplay?
- Will there ever be a larger board than 4x4? *Currently, the implementation supports larger boards, but the service only supports 4x4.*
- Does a user's score need to be stored and updated? *Currently, user scores are not stored.*

## Remaining Work/ Known Issues
Project statement: Deliver an application to allow a user to enjoy a game of 98point6 Drop Token. The app must allow the user to choose who goes first, display who won and allow the user to play again, and allow the user to play again in the event of a draw. Additionally, if a user attempts to place a token in a column that is full, the app must prompt the user to play a different column. More information: https://github.com/jLoven/98point6-homework/blob/master/9dt-mobile.pdf

### Remaining work
[Project planning board](https://trello.com/invite/b/12zuhaka/8968ca621d75436c1b293b9b1da631bc/98point6-homework)
- Usability testing of implementation (update copy and styling accordingly)
- JavaScript unit tests
- Accessibility review (test for blind/ low-sighted users)
- Internationalization (allow users to select their language)
- Latency improvements if needed (users may have slow networks)

### Known issues
- The board does not prevent the user from attempting to drop a token while the service is still responding, so they could try to make their move in a space that would end up being full (if the service response is taking a long time).
