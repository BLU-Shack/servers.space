<div style='text-align: center; '>
    <p>
        <img src='https://i.imgur.com/FfvEt4G.png' width=500 height=230>
    </p>
    <p>
        <a href='https://www.npmjs.com/package/servers.space'><img src='https://nodei.co/npm/servers.space.png'></a>
    </p>
</div>

# botlist.space - Alternative Wrapper

To install, use `npm i simple.space`

## What sets the difference than the original?

| [botlist.space](https://www.npmjs.com/package/botlist.space) | simple.space                                       |
|--------------------------------------------------------------|----------------------------------------------------|
| `Client.getBot('1234')`                                      | `Client.fetchBot('1234')`                          |
| `Client.getSelfBot()`                                        | `Client.fetchBot()` (omit id -> Use options.botID) |
| `Client.postServerCount(1)`                                  | `Client.postCount('1234', { countOrShards: 1 })`   |
| `Client.postServerCount([1, 2])`                             | `Client.postCount({ countOrShards: [1, 2] })`      |
| No cache built-in                                            | Caching is disabled by default.                    |

## Full JSDoc Documentation

https://blu-shack.github.io/simple.space/

## Contributing

- Find out [here](https://github.com/BLU-Shack/simple.space/blob/master/.github/CONTRIBUTING.md)!