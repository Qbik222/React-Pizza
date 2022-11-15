import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="58" cy="17" r="2" />
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="282" rx="12" ry="12" width="275" height="21" />
    <rect x="5" y="409" rx="5" ry="5" width="90" height="25" />
    <rect x="119" y="397" rx="26" ry="26" width="152" height="45" />
    <rect x="0" y="313" rx="10" ry="10" width="280" height="71" />
  </ContentLoader>
);

export default Skeleton;
