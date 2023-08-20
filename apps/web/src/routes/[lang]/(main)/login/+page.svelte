<script lang="ts">
	import { graphql } from '$houdini';
	import type { GraphQLError } from '@graphace/commons/types';
	import { LoginForm } from '~/lib/components/login';

	const loginMutation = graphql(`
		mutation Login($login: String!, $password: String!) {
			login(login: $login, password: $password)
		}
	`);

	const login = (
		event: CustomEvent<{
			login: string | undefined;
			password: string | undefined;
			then: (token: string) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		if (event.detail.login && event.detail.password)
			loginMutation
				.mutate({ login: event.detail.login, password: event.detail.password })
				.then((result) => {
					console.log(result);
					alert(JSON.stringify(result));
				})
				.catch((e) => {
					console.log(e);
					alert(JSON.stringify(e));
				});
	};
</script>

<LoginForm on:login={login} />
