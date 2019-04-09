import uuid from "./uuid"

const ids = [
  uuid(),
  uuid(),
  uuid(),
  uuid(),
]

export default {
  widgets: {
    data: {
      [ids[0]]: {
        title: "manifesto",
        body: `the history of all hitherto existing society is the history of class struggles.

freeman and slave, patrician and plebeian, lord and serf, guild-master and journeyman, in a word, oppressor and oppressed, stood in constant opposition to one another, carried on an uninterrupted, now hidden, now open fight, a fight that each time ended, either in a revolutionary reconstitution of society at large, or in the common ruin of the contending classes.`,
      },
      [ids[1]]: {
        title: "values",
        body: `1. individuals and interactions over processes and tools
2. working software over comprehensive documentation
3. customer collaboration over contract negotiation
4. responding to change over following a plan`
      },
      [ids[2]]: {
        title: "code of conduct",
        body: `### our pledge

in the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.`,
      },
      [ids[3]]: {
        title: "contact info",
        body: `![Autark Labs logo](https://pbs.twimg.com/profile_images/1083445444246568961/ASkyvpEo_400x400.jpg)

[@autarklabs](https://twitter.com/autarklabs)`,
      }
    },
    order: ids,
  }
}
