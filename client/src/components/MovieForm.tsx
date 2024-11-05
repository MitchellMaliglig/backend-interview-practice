import { FormEvent } from "react";

type movieFormProps = {
  onSaveMovie: (e: FormEvent<HTMLFormElement>) => void;
};

export function MovieForm({ onSaveMovie }: movieFormProps) {
  return (
    <form onSubmit={onSaveMovie}>
      <div className="row">
        <label>
          title<input name="title" placeholder="insert title"></input>
        </label>
        <label>
          summary<input name="summary" placeholder="insert summary"></input>
        </label>
      </div>
      <div className="row">
        <label>
          link<input name="link" placeholder="insert link"></input>
        </label>
        <label>
          rating
          <input
            name="rating"
            type="number"
            defaultValue={1}
            min={1}
            max={5}
          ></input>
        </label>
      </div>
      <button>Add movie</button>
    </form>
  );
}
