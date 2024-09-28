import { Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Wolfkart`}</title>
    </Helmet>
  );
};
export default MetaData;
