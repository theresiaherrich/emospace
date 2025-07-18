import Button from "../../../components/ui/button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Journal } from "../types/type";
import { useEffect } from "react";

const DetailJournalContainer = () => {
  const { id } = useParams<{ id: string }>();
  const journal = Journal.find((item) => item.id === Number(id));

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState(journal?.title || "");
  const [content, setContent] = useState(journal?.content || "");
  const [isSaved, setIsSaved] = useState(!!journal);

  const navigate = useNavigate();

  useEffect(() => {
    if (!journal && id !== "new") {
      navigate("/not-found");
    }
  }, [journal, id, navigate]);

  const handleSave = () => {
    setIsSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const today =
    journal?.date ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-[#F3F3F3] bg-cover min-h-screen w-full relative">
      <img src="/assets/gradient-purple.svg" alt="" className="absolute -top-10 md:-top-36 left-1/2 transform -translate-x-1/2 w-[800px] "/>
      <img src="/assets/gradient-blue.svg" alt="" className="-top-80 right-1/4 absolute w-[400px] max-w-full -translate-x-1/2"/>
      <img src="/assets/gradient-pink.svg" alt="" className="absolute bottom-0 w-full right-0 h-72 object-top object-cover z-0"/>
      <div className="pt-36 px-4 sm:px-10 md:px-20 pb-24 flex flex-col min-h-screen relative z-10">
        <div className="mb-20 relative text-center">
          <img src="/assets/bintang-1.svg" alt="" className="absolute top-[-70%] left-[37%] transform -translate-x-[150%] w-6 sm:w-8"/>
          <h1 className="font-spartan text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
            My<span className="text-[#633796]"> Journal</span>
          </h1>
          <img src="/assets/bintang-1.svg" alt="" className="absolute bottom-[-65%] right-[36%] transform translate-x-[150%] w-5 sm:w-6"/>
        </div>
        <div>
          <div className="relative w-full mb-5">
            {isSaved ? (
              <img
                src={image ? URL.createObjectURL(image) : "/assets/journal-photo.svg"}
                alt="Upload"
                className="rounded-lg object-cover object-center w-full h-48"
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="upload-image">
                  <img
                    src={previewUrl || "/assets/journal-photo.svg"}
                    alt="Upload"
                    className="rounded-lg object-cover object-center w-full h-48 hover:opacity-80 transition duration-200 cursor-pointer"
                  />
                </label>
              </>
            )}
          </div>

          <div className="flex flex-col p-4 gap-8">
            <div className="flex flex-col gap-1">
              {isSaved ? (
                <h1 className="font-bold font-spartan text-2xl">{title}</h1>
              ) : (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter your journal title"
                  className="font-bold font-spartan text-2xl bg-transparent focus:outline-none placeholder:text-black"
                />
              )}
              <p className="font-spartan font-medium text-opacity-60 text-[#1C1C1C]">
                {today}
              </p>
            </div>

            {isSaved ? (
              <p className="font-spartan text-xl min-h-36 whitespace-pre-line">{content}</p>
            ) : (
              <div className="border border-[#29262A] rounded-lg px-5 py-3 min-h-36">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type how's your day..."
                  className="bg-transparent font-spartan focus:outline-none w-full resize-none overflow-hidden scrollbar-hide text-xl min-h-36"
                />
              </div>
            )}
          </div>

          <div className="mt-24 flex justify-end">
            <Button
              variant="primary"
              className="rounded-xl py-3 px-10"
              onClick={isSaved ? () => navigate("/my-journal") : handleSave}
            >
              {isSaved ? "Back" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailJournalContainer;
