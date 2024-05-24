function BrandPage({ params }: { params: { brandId: string } }) {
  //   const router = useRouter();
  //   const { brandId } = router.query;

  return <div>{params.brandId}</div>;
}

export default BrandPage;
