// app/(public)/[dealershipSlug]/tracking/page.tsx

interface TrackingPageProps {
  params: Promise<{
    dealershipSlug: string;
  }>;
  searchParams: Promise<{
    id?: string; // Ex: meudominio.com/loja/tracking?id=codigo-da-entrega
  }>;
}

export default async function TrackingPage({
  params,
  searchParams,
}: TrackingPageProps) {
  const { dealershipSlug } = await params;
  const { id: deliveryId } = await searchParams;

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      {/* Aqui você busca a logo da loja usando o dealershipSlug */}
      <h1 className="text-xl font-bold">Rastreamento — {dealershipSlug}</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Acompanhando o pedido: <span className="font-mono">{deliveryId}</span>
      </p>

      {/* Linha do tempo do tracking pública aqui */}
    </div>
  );
}
