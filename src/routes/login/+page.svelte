<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { loginSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '@/components/ui/button';

	export let data: { form: SuperValidated<Infer<typeof loginSchema>>; auth?: any };

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

{#if data.auth}
	<div class="flex h-full items-center justify-center">
		<div>You are logged in</div>
	</div>
{/if}

{#if !data.auth}
	<div class="flex h-full items-center justify-center">
		<Card.Root>
			<Card.Header>
				<Card.Title>Login</Card.Title>
				<Card.Description>Enter your credentials to login</Card.Description>
				<Card.Content>
					{@render LoginForm()}
				</Card.Content>
			</Card.Header>
		</Card.Root>
	</div>
{/if}

{#snippet LoginForm()}
	<form method="post" use:enhance>
		{@render FormField(form, 'email')}
		{@render FormField(form, 'password')}
		<Button
			onclick={() => {
				form.submit();
			}}>Submit</Button
		>
	</form>
{/snippet}

{#snippet FormField(form, name: "email" | "password")}
	<Form.Field {form} {name}>
		<Form.Control let:attrs>
			<Form.Label>{name}</Form.Label>
			<Input {...attrs} bind:value={$formData[name]} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
{/snippet}
