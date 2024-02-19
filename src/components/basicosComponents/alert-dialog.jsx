import { ButtonCancelar, ButtonEfeite } from "./Buttons";

export function AlertDialog({ closeModal, onClick }) {
  return (
    <div className="px-4 py-2">
      <div className="space-y-3 py-4">
        <h3 className="font-medium text-xl text-center">Você Tem certeza disso? </h3>
        <p>
          Essa ação não pode ser desfeita. Isso excluirá permanentemente a
          categoria selecionada e todos os seus produtos pertencentes.
        </p>
      </div>
      <div className="flex gap-2 mt-4 justify-between">
        <ButtonCancelar  onClick={() => closeModal()}>Cancelar</ButtonCancelar>
        <ButtonEfeite onClick={() => {onClick(); closeModal()}} texto={"Continuar"} />
      </div>
    </div>
  );
}
