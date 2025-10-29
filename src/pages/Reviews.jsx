import React from "react";

const IMAGES = [
  "/images/reviews/799b02374d80fadea391.jpg",
  "/images/reviews/a641bbeef75940071948.jpg",
  "/images/reviews/e6d93be51352a40cfd43.jpg",
  "/images/reviews/z6763787743073_344d1cb3dd087785237067c1ebdb2811.jpg",
  "/images/reviews/z6763787842101_05659e45c2a19a170393e8ab0391271b.jpg",
  "/images/reviews/z6763787958687_4e090ae3cf10a35f2997ed414db25d63.jpg",
  "/images/reviews/z6763788107305_14dd713a5bb4f278c34597cb76c938da.jpg",
  "/images/reviews/z6763788306323_c58597856098a86e3dfc1314ffc88598.jpg",
  "/images/reviews/z6763788547158_acf65ece8d10df39383da0983eae1349.jpg",
  "/images/reviews/z6763788806963_a2eadc97ec6bd319a9a8a52ff3e50e8e.jpg",
  "/images/reviews/z6763789087560_b7a16cc10de227182696a3dc9f6c1c54.jpg",
  "/images/reviews/z6763789357431_671ea0b6ca1d20e0dd0090bc4a45541f.jpg",
  "/images/reviews/z6763789574774_f16535e5405f6ae22657bcf1e15f07b3.jpg",
  "/images/reviews/z6763789817213_8b8fc2f9ad085816b4f2fcc5175a52e1.jpg",
  "/images/reviews/z6763790058951_34a4321b94785940fe08377f0ac7ff5f.jpg",
  "/images/reviews/z6763790277116_3f411317b958f27aa427b8ec279b5269.jpg",
  "/images/reviews/z6763790648132_c8ec14deca8913fcbabb16bb1d038251.jpg",
  "/images/reviews/z6763790863779_ef721defa7f67f5877e65ead85829f87.jpg",
  "/images/reviews/z6763791013394_9dc4a679515fc9f76228f0c854d01f6e.jpg",
  "/images/reviews/z6763791149450_b30bf76d7115497351884c1a173473d3.jpg",
  "/images/reviews/z6763791242887_10b759cbe66166c109b069b540e51414.jpg",
  "/images/reviews/z6763796568920_b8133c338b7e505093d5caeae534a4e5.jpg",
  "/images/reviews/z6763796660666_16424b797b7cdd09d2a6e89cc13852fa.jpg",
  "/images/reviews/z6763802175809_59a63fe933dbeba5adffc60b2ed987fe.jpg",
  "/images/reviews/z6763802289877_77f080918c1e5f7574384b1d26c16a33.jpg",
  "/images/reviews/z6763802684085_7d7fa35b4c38a95fb9ce11ee4610c62e.jpg",
  "/images/reviews/z6763802959118_891d9acad1d2267f116faab9dd6b0cba.jpg",
  "/images/reviews/z6763803221977_48464ba9d287a6d6dec513fe524b2523.jpg",
  "/images/reviews/z6763809803198_c4f5abc2df92e895f867858c048b6372.jpg",
  "/images/reviews/z6763809826612_c04d3b0016a8f5aaf3dd348554f56ffc.jpg",
  "/images/reviews/z6763823007370_22044c33fc0df300788535239620f296.jpg",
  "/images/reviews/z6763823131866_19ac7e4494b7c7c90c04f57ad45df284.jpg",
  "/images/reviews/z6763823670285_f631d9d1affd3a6d6f077360ec684435.jpg",
  "/images/reviews/z6763824338013_726667ca34f1d6c85ba791fa660b118a.jpg",
  "/images/reviews/z6763825047303_9bfce22cb26d52c8645f0c1152dc84fe.jpg",
  "/images/reviews/z6763825780818_bed810d6a23a4788f361379ace5511a3.jpg",
  "/images/reviews/z6763826092591_6e50e74d8fc28ac3985fdf913a266631.jpg",
  "/images/reviews/z6763826315054_a11bf839a34a7fa0a7571cc8cd4b640d.jpg",
  "/images/reviews/z6763834383253_29c92cb47e0ca9638c165f690ee41174.jpg",
  "/images/reviews/z6763834421162_410d82e42379c77d1cde44a8a18fcde9.jpg",
  "/images/reviews/z6763851885572_05e37dcecd66517f6a03cf23da591c8e.jpg",
  "/images/reviews/z6763851903941_1e4d072e8da96cae2594256d023f5bd0.jpg",
  "/images/reviews/z6763852384316_0e3298fb8076994b87af617ad9b11a51.jpg",
  "/images/reviews/z6763853017216_c33779998d9ef505856460cd40b10253.jpg",
  "/images/reviews/z6763853666492_dace7e58050a1aea54dd39fda6c15113.jpg",
  "/images/reviews/z6763854118445_bcbb23bf659944b7fac9a6a0b793aa75.jpg",
  "/images/reviews/z6763854490992_6c84a0c657a2301e2f8f7064827d855f.jpg",
  "/images/reviews/z6763855031688_769b94d2ade52ca7df6e00dd64e4f38f.jpg",
  "/images/reviews/z6763855424631_0776df4d06dc1863f167983c958f56c5.jpg",
  "/images/reviews/z6763855945442_8fb3454a42aa7edf5d2daa8aec6ce0eb.jpg",
];

const Reviews = ({ theme }) => {
  const textColor = theme === "night" ? "text-white" : "text-[#0f3e2c]";
  const subColor = theme === "night" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "night" ? "bg-[#120d1a]/40" : "bg-white";

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${textColor}`}>Customer Reviews</h1>
      <p className={`mb-8 ${subColor}`}>
        Authentic screenshots from our customers. Thanks for the love!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {IMAGES.map((src, i) => (
          <div key={i} className={`rounded-xl overflow-hidden shadow ${cardBg} border border-white/10`}>
            <img src={src} alt={`Review ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;


