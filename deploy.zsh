cd covid-react-viz
npm run build
aws s3 sync ./build s3://cdc-covid-viz.zgallegos.com