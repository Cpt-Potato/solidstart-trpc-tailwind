import { createSignal, For, onMount, ParentComponent, Suspense } from 'solid-js';
import { Title } from 'solid-start';
import { trpc } from '~/utils/trpc';

type Note = {
  id: string;
  text: string;
};

const Notes: ParentComponent = () => {
  let noteTextInput: HTMLInputElement;

  const getNotes = trpc.getAllNotes.useQuery(() => {});
  const createNoteMutation = trpc.createNote.useMutation();

  onMount(() => refetchNotes());
  const [notes, setNotes] = createSignal<Note[]>();

  const refetchNotes = async () => {
    const { data } = await getNotes.refetch();
    console.log(data);
    setNotes(data);
  };
  const createNote = async () => {
    if (!noteTextInput.value.trim()) return;
    await createNoteMutation.mutate({ text: noteTextInput.value.trim() });
    noteTextInput.value = '';
    await refetchNotes();
  };

  return (
    <>
      <Title>Notes</Title>
      <div class="flex flex-col items-center gap-4">
        <div class="mt-5">
          <p class="font-bold text-4xl">Notes</p>
        </div>
        <div>
          <input ref={noteTextInput} type="text" class="mx-2 border-2 focus:outline-amber-300" />
          <button class="p-1.5 bg-green-400 rounded-xl hover:bg-green-500" onclick={createNote}>
            Добавить новую заметку
          </button>
        </div>
        <button
          class="p-1.5 bg-amber-500 rounded-xl hover:bg-amber-800 hover:text-white"
          onclick={refetchNotes}
          disabled={getNotes.isRefetching}
        >
          Обновить список заметок
        </button>
        <Suspense fallback={<div class="font-bold text-4xl">Loading...</div>}>
          <div class="bg-gray-100 w-[300px] text-xl text-center">
            <For each={notes()}>{(note) => <p>{note.text}</p>}</For>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Notes;
