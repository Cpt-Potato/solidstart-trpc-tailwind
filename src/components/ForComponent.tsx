import { For, ParentComponent, Show } from 'solid-js';

type City = {
  id: number;
  name: string;
};

type District = {
  id: number;
  name: string;
  cityId: number;
};

type Shop = {
  id: number;
  name: string;
  districtId: number;
};

type ForComponent = {
  items: City[] | District[] | Shop[] | undefined;
  onclick(itemId: number, itemName: string): void;
};

const ForComponent: ParentComponent<ForComponent> = (props) => {
  return (
    <Show when={props.items?.length} fallback={<p>Информация ещё не добавлена :(</p>}>
      <For each={props.items}>
        {(item) => (
          <button class="btn-primary" onclick={() => props.onclick(item.id, item.name)}>
            {item.name}
          </button>
        )}
      </For>
    </Show>
  );
};

export default ForComponent;
