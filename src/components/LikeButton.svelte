<script lang="ts">
  import { hc } from "hono/client";
  import { onMount } from "svelte";
  import type { countLikes, ServerType } from "@/workers/main";

  type Likes = Awaited<ReturnType<typeof countLikes>>;

  const client = hc<ServerType>(window.location.origin);
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

  let handleClick = $derived(() => {
    if (likes?.likedByMe) {
      unlike();
    } else {
      like();
    }
  });

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

<div
  class="fixed z-50 bottom-16 right-16 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-3 min-w-[80px] text-center"
>
  <button
    class="flex items-center justify-center gap-2 w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
    onclick={handleClick}
  >
    <svg
      class="w-8 h-8 {likes?.likedByMe
        ? 'fill-red-500 text-red-500'
        : 'fill-none'}"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
    {likes?.count || 0}
  </button>
</div>
