import { GraphiQL } from 'graphiql';
import type { Fetcher } from '@graphiql/toolkit';
import 'graphiql/graphiql.min.css';

const fetcher: Fetcher = async graphQLParams => {
  const data = await fetch(
    process.env.REACT_APP_GRAPHQL_URL!,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${process.env.REACT_APP_AUTH_SCHEME!} ${btoa(process.env.REACT_APP_AUTH_TOKEN!)}`
      },
      body: JSON.stringify(graphQLParams)
    },
  );
  return data.json().catch(() => data.text());
};

const GraphiQLPage = () => <GraphiQL fetcher={fetcher} />;

export default GraphiQLPage;