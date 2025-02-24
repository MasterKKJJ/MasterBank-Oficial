interface DivisaoPequenaProps {
    ignorePadding?: boolean;
    ignorePaddingNumber?: number; // valor numérico que representa, por exemplo, o número da classe -mx-{n} (n na escala do Tailwind)
    numero_tamanho?: number
}

const DivisaoPequena = ({
    ignorePadding = false,
    ignorePaddingNumber = 6,
    numero_tamanho = 2
}: DivisaoPequenaProps) => {
    if (ignorePadding) {
        // Considerando que cada unidade de spacing do Tailwind equivale a 0.25rem,
        // se ignorePaddingNumber for 6, a margem negativa será -1.5rem.
        const negativeMargin = `${ignorePaddingNumber * 0.25}rem`;
        return (
            <div
                style={{ marginLeft: `-${negativeMargin}`, marginRight: `-${negativeMargin}` }}
                className="w-screen"
            >
                <div className="h-[2px] w-full bg-zinc-900" />

            </div>
        );
    } else {
        return <div className="h-[2px] w-full bg-zinc-900" />;
    }
};

export default DivisaoPequena;
