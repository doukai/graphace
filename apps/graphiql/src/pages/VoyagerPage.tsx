import { Voyager, voyagerIntrospectionQuery } from 'graphql-voyager';
import 'graphql-voyager/dist/voyager.css'

const response = await fetch(
    process.env.REACT_APP_GRAPHQL_URL!,
    {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${process.env.REACT_APP_AUTH_SCHEME!} ${btoa(process.env.REACT_APP_AUTH_TOKEN!)}`
        },
        body: JSON.stringify({ query: voyagerIntrospectionQuery }),
    },
);

const introspection = await response.json();

const VoyagerPage = () => <Voyager
    introspection={introspection}
    displayOptions={{ skipRelay: false, showLeafFields: true }}
/>;

export default VoyagerPage;