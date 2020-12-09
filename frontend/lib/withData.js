import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";

function createClient({ headers }) {
	return new ApolloClient({
		credentials: "include",
		// uri: `http://localhost:4444/`,
		uri: `https://graphql.fillmydiary.co.uk/`,
		request: operation => {
			operation.setContext({
			  fetchOptions: {
				credentials: "include"
			  },
			  headers
			});
		  }
	});
}

export default withApollo(createClient);
