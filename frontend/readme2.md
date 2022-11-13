npm install emailjs-com

// to use Alert, you have to install both 
npm i bootstrap
npm i react-bootstrap

 "heroku-postbuild": "cd frontend && npm install && npm run build && cd ../backend && npm install"  自動でbuildもしていたが、fronendでbuildしてからherokuにdeployした方が軽いため除去

// to implement stripe gateway
npm i @stripe/react-stripe-js @stripe/stripe-js axios

npm install --save @fullcalendar/react @fullcalendar/daygrid
 npm i @fullcalendar/interaction

 npm install --save @nestjs/serve-static

ipfs daemon で出てくる画像と出てこない画像がある


pinataにはpublic gateway(読み込みが遅い) と　dedicated gateway(限られた人のみがそこから読み込める, 月額で払う必要あり)がある
  - public gateway: https://gateway.pinata.cloud/ipfs/${res.IpfsHash}
  - dedicated gateway: https://${pinataDedicatedDomain}/ipfs/${res.IpfsHash}