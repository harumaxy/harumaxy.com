<script lang="ts">
import { hc } from "hono/client";
import { onMount } from "svelte";

import type { AppType, countLikes } from "@/workers/main";

type Likes = Awaited<ReturnType<typeof countLikes>>;

const client = hc<AppType>(window.location.origin);
let userUuid = $state<string | null>(null);
const { slug } = $props<{ slug: string }>();

let likes = $state<Likes | null>(null);

const fetchLikes = async () => {
	if (!userUuid) return null;
	const res = await client.api.likes[":slug"].$get({
		param: { slug },
		query: { userUuid },
	});
	likes = await res.json();
};
const like = async () => {
	if (!userUuid) return;
	const res = await client.api.likes[":slug"].$post({
		param: { slug },
		json: { userUuid },
	});
	likes = await res.json();
};

const unlike = async () => {
	if (!userUuid) return;
	const res = await client.api.likes[":slug"].$delete({
		param: { slug },
		json: { userUuid },
	});
	likes = await res.json();
};

onMount(() => {
	const storedUserId = localStorage.getItem("userId");
	if (storedUserId) {
		userUuid = storedUserId;
	} else {
		userUuid = crypto.randomUUID();
		localStorage.setItem("userId", userUuid);
	}
	fetchLikes();
});
</script>

<div>{likes?.count}</div>
