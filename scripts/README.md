# js
install: `yarn install --cwd ./scripts`
run: `NODE_PATH=./scripts node ./scripts/git-log.js`
  node would automatically look for the module in the NODE_PATH?
  use `node ./scripts/git-log.js` would work

# py
install: `pip install -r ./scripts/requirements.txt`
run: `python ./scripts/date_process.py`
