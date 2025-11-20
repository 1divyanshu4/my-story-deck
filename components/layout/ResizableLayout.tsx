import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorPanel from "../panels/EditorPanel";
import PreviewPanel from "../panels/PreviewPanel";

export function ResizableLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className=" min-h-screen rounded-lg border w-full"
    >
      <ResizablePanel defaultSize={50} className=" w-full">
        <div className="flex min-w-[500px] w-full h-full items-center justify-center p-6">
          <EditorPanel />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="hidden lg:block">
        <div className="flex items-center justify-center p-6 min-w-[500px] w-full h-full ">
          <PreviewPanel />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
