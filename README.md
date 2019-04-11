# Widgets App

## Running your app

### Using HTTP

Running your app using HTTP will allow for a faster development process of your app's front-end, as it can be hot-reloaded without the need to execute `aragon run` every time a change is made.

- First start your app's development server running `npm run start:app`, and keep that process running. By default it will rebuild the app and reload the server when changes to the source are made.

- After that, you can run `npm run start:aragon:http` which will compile your app's contracts, publish the app locally and create a DAO. You will need to stop it and run it again after making changes to your smart contracts.

Changes to the app's background script (`app/script.js`) cannot be hot-reloaded, after making changes to the script, you will need to either restart the development server (`npm run start:app`) or rebuild the script `npm run build:script`.

### Using IPFS

Running your app using IPFS will mimic the production environment that will be used for running your app. `npm run start:aragon:ipfs` will run your app using IPFS. Whenever a change is made to any file in your front-end, a new version of the app needs to be published, so the command needs to be restarted.

## What's in the box?

### npm Scripts

- **start** or **start:aragon:ipfs**: Runs your app inside a DAO served from IPFS
- **start:aragon:http**: Runs your app inside a DAO served with HTTP (hot reloading)
- **start:app**: Starts a development server for your app
- **compile**: Compile the smart contracts
- **build**: Builds the front-end and background script
- **build:app**: Builds the front-end
- **build:script**: Builds the background script
- **test**: Runs tests for the contracts
- **publish:patch**: Release a patch version to aragonPM (only frontend/content changes allowed)
- **publish:minor**: Release a minor version to aragonPM (only frontend/content changes allowed)
- **publish:major**: Release a major version to aragonPM (frontend **and** contract changes)
- **versions**: Check the currently installed versions of the app

### Libraries

- [**@aragon/os**](https://github.com/aragon/aragonos): Aragon interfaces
- [**@aragon/client**](https://github.com/aragon/aragon.js/tree/master/packages/aragon-client): Wrapper for Aragon application RPC
- [**@aragon/ui**](https://github.com/aragon/aragon-ui): Aragon UI components (in React)

## Publish

This app has 3 environments defined in `arapp.json`:

| Environment   | Network   |
|---            |---        |
| default       | localhost |
| staging       | rinkeby   |
| production    | mainnet   |

Prerequisites:
- ENS Registry address

Note: the `default` environment which points to `localhost` does not have an ENS Registry address specified because the `@aragon/cli` will default the value to `0xB9462EF3441346dBc6E49236Edbb0dF207db09B7` (the ENS Registry pre-deployed on the local development chain).

### Introduction to environments

Environments are defined in `arapp.json`, for example `staging` points to:
- an ENS registry (`0x314159265dd8dbb310642f98f50c066173c1259b`)
- an APM registry (`open.aragonpm.eth`)
- an APM repository (`app`)
- an Ethereum network (`rinkeby`)
- an Ethereum websockets provider (`wss://rinkeby.eth.aragon.network/ws` - to **read** from the blockchain)

The `rinkeby` network is further defined in `truffle.js`, and has:
- an Ethereum provider (to **write** to the blockchain):
    - an address (`https://rinkeby.infura.io`)
    - an Ethereum Account (`0xb4124cEB3451635DAcedd11767f004d8a28c6eE7`)
    (which is the first account generated from the `DEFAULT_MNEMONIC` variable, to use a different account see [here](#Using-a-different-Ethereum-account))

### Major version: content + contract

Command:
```
npm run publish:major -- --environment staging
```

This will:
1. _build_ the app's frontend (the output lives in `dist`)
2. _compile_ the app's contract (the output lives in `build`)
3. publish the app to the **staging** environment.

Sample output:
```
 > aragon apm publish major "--environment" "staging"

 ✔ Successfully published app.open.aragonpm.eth v1.0.0:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ℹ Transaction hash: 0x3d752db29cc106e9ff98b260a90615921eb32471425a29ead8cbb830fb224d8
```

Note: the contract location is defined in `arapp.json` under `path`.
Note: you can also deploy a major version with only frontend changes by passing `--only-content`.

### Minor/patch version: content only

Command:
```
npm run publish:patch -- --environment staging
```

This will:
1. _build_ the app's frontend (which lives in `dist`)
2. publish the app to the **staging** environment.

Sample output:
```
 ✔ Successfully published app.open.aragonpm.eth v1.1.1:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
 ℹ Transaction hash: 0x57864d8efd8d439008621b494b19a3e8f876a8a46b38475f9626802f0a1403c2
```

### Check published versions

Command:
```
npm run versions -- --environment staging
```

Sample output:
```
 ℹ app.open.aragonpm.eth has 4 published versions
 ✔ 1.0.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ✔ 1.1.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmSwjUZFpv2c2e9fLoxtgFrAsAmBN4DyQGJp4RcqQcW3z3
 ✔ 1.1.1: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
 ✔ 2.0.0: 0x74CBbbC932d7C344FCd789Eba24BfD40e52980c9 ipfs:Qmadb3hzwLDKtb93fF367Vg1epkdsLZF4dhpapNYynjgZF
```

### Using a different Ethereum account

To deploy from a different account, you can:
- define a `~/.aragon/mnemonic.json` file
    ```
    {
        "mnemonic": "explain tackle mirror kit ..."
    }
    ```
    or
- define a `~/.aragon/${network_name}_key.json` file, for example: `~/.aragon/rinkeby_key.json`
    ```
    {
        "keys": [
            "a8a54b2d8197bc0b19bb8a084031be71835580a01e70a45a13babd16c9bc1563"
        ]
    }
    ```


Exercise Retrospective
======================

On Thursday, 4 April 2019, I, @chadoh, received an email from Autark asking me to complete this challenge within a week. The requirements[[1]](https://docs.google.com/document/d/1q1ADfotqZ8KhF2p5FLqJhv15QTx4gW-dazusJOAEMIE/edit#):

> Using [the Widget App](https://github.com/AutarkLabs/fe-dev-challenge) as a starting point, build a widget-editing app with the following features:
>
> 1. Each widget has a customizable title and body text.
> 2. The body text will have support for markdown in addition to embedding images.
> 3. The user should be able to add, delete, and update the text of the widgets. These actions will be protected by a role.
> 4. Widgets should have both an “edit” mode and a “view” mode.
> 5. The user should be able to customize the widget into various rectangular sizes, in addition to being able to rearrange the location of the widgets into a grid (that has at least 3 columns).


My Approach
-----------

I disagreed with one requirement above, and deprioritized another.

### Accessibility concerns

Autark [lists accessibility a core pillar of the organization](https://github.com/AutarkLabs/flock/blob/autark-proposal/teams/Autark/2019Q1-2.md), so I wanted to ensure that anything I built would work well for any screen size or interaction mode. Here ways I've tested to use this app:

* From an iPhone
* Using Voice Over on macOS (I am happy to demonstrate this in a screenshare)
* From a desktop browser

Crucially, **ensuring accessibility required ignoring the fifth feature requirement.** The fifth requirement states that widgets should be rearrangeable – my implementation satisfies this requirement. It also states the widgets should be customizable into various rectangular sizes – this I chose to avoid.

I could imagine this requirement meaning multiple things, and if we intend to grow this app into something useful I would want to have more conversations about the intent here. But for this built-in-one-week-on-the-side version, any possible version of this seemed like it would break app usability for:

* mobile phone users
* keyboard-only and keyboard-preferring users
* users of screen readers

### Frontend-only

As this was a frontend engineering challenge, I wanted to focus on building a fully usable frontend app, even if it didn't yet interact with an actual blockchain. This required spoofing the backend for two reasons:

1. Authenticating
2. Saving data

In both cases, I've contained the interaction points for these spoofed layers to single files. The main app code requires no change. To add real authentication, only the [app/utils/auth.ts](https://github.com/chadoh/autark-fe-challenge/blob/solution/app/utils/auth.ts) file requires updates.

The data-persistence spoofing I borrowed from an older project. It uses a synchronous API, and has some other design choices that I question now. I would expect it to change a fair bit when adding real persistence to the app. Even so, at that time, very few changes will be needed to the app outside of the [app/database/index.js](https://github.com/chadoh/autark-fe-challenge/blob/solution/app/database/index.js) file.


What went well
--------------

* **Accessibility**

  The widget-based UI had significant accessibility challenges, and I think the solution I came up with works really well. In fact, I think the app might be _more_ usable for keyboard-driven and screen-reader users, because they get to avoid drag and drop!

  I actually took this as an opportunity to learn about the macOS screen reader, called Voice Over. As I built each new interaction, I tried it out multiple times in Voice Over to see if it would make sense to a blind user. Interacting with the app this way convinced me to limit edit-related UI to single Edit buttons for each item, rather than having some of it available all the time.

* **CSS Grid**

  The auto-reflow of the app looks great, and it's all thanks to CSS Grid.

* **Spoofing authentication**

  I initially planned to forego any sort of authentication, thinking I wouldn't have time. I decided to spoof it on Tuesday, and the design for my spoofing layer evolved as I worked. I really like how it turned out and think it gives a good idea of what using the complete version of this app will feel like.


Areas for improvement
---------------------

* **Communication**

  I treated this as a very individualist exercise, and I wish I'd treated it more as a consulting or team exercise.

  For example, after a few days of looking through the starter app and aragonUI, I had developed the approach I wanted to take. At that point, I wish I'd emailed and/or scheduled a meeting to discuss the approach with the Autark team and see if that approach made sense to them.

* **Mobile design**

  The drag-and-drop experience on mobile does not work well. It works well in simulated mobile environments (such as in a desktop browser's Responsive Mode or in the iOS Simulator that comes with Xcode), but it does not work well on an actual phone.

  Partly, this is due to limitations in the drag-and-drop interaction in the first place. Partly, this is due to the small drag handles that I used. I would love to consult with a designer to come up with a better approach that could get around some of these challenges.

* **Design**

  Actually, I'd love to consult with a designer to reimagine the whole app!

  I suspect a designer could come up with a better way to present this UI than a widget-based approach.

* **Internationalization**

  I love that Autark lists internationalization as another core pillar, and I would enjoy moving all app copy to a spoofed i18n layer, which can be populated from IPFS later when we have it ready.

* **aragonUI**

  [I think in](https://bits.theorem.co/css-pro-tips-responsive-font-sizes-and-when-to-use-which-units/) relative units and unpredictable screen resolutions, and was disappointed to see that multiple aragonUI components have hard-coded pixel-based widths. I also think there's room to improve both the user-facing and developer-facing design of some of the components.


Conclusion
----------

I'd love to have a meeting where I can screenshare and show off the keyboard-driven and screen-reader based interactions with this app, so we can discuss the approach and see if we could improve it even more.

During that meeting, I'd also like to hear more about what you were looking for on your side. Were you hoping for more up-front communication? Did you intentionally add requirements that challenge Autark's commitment to accessibility? Where did this challenge come from, and what's its future? What's next for Autark and me?
