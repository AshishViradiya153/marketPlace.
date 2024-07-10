"use client";
import React, { useState } from "react";

import { useEditor, EditorContent, type Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }
    return (
        <div className="flex space-x-2">
            <Button
                variant={
                    editor.isActive("paragraph") ? "default" : "secondary"
                }
                type="button"
                onClick={() => editor.commands.setParagraph()}
            >
                P
            </Button>
            <Button
                variant={
                    editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
                }
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                H1
            </Button>
            <Button
                variant={
                    editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
                }
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </Button>
            <Button
                variant={
                    editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
                }
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                H3
            </Button>
            <Button
                variant={editor.isActive("bold") ? "default" : "secondary"}
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="font-bold"
            >
                Bold
            </Button>
            <Button
                variant={editor.isActive("italic") ? "default" : "secondary"}
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="italic"
            >
                Italic
            </Button>
            <Button
                variant={editor.isActive("strike") ? "default" : "secondary"}
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className="line-through"
            >
                Strike
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive('bulletList') ? "default" : "secondary"}
            >
                BulletList
            </Button>
        </div>
    );
};

const EditorArea = () => {
    const [json, setJson] = useState<null | JSONContent>(null);
    const editor = useEditor({
        extensions: [StarterKit],
        content: json,
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[150px] prose prose-sm sm:prose-base'
            }
        },
        onUpdate: ({ editor }) => {
            setJson(editor.getJSON())
        }
    });

    return (
        <div>
            <input type="hidden" name="description" value={JSON.stringify(json)} />
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="rounded-md border p-2 min-h-[150px] mt-2"
            />
        </div>
    );
};

export default EditorArea;
