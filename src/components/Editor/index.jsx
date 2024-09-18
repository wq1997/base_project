import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css';

const EditorTemp = ({
    placeholder,
    onChange,
    value
}) => {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState(value);
    const toolbarConfig = {

    }

    const editorConfig = {
        placeholder,
        scroll: true,
        // 继续其他配置
        MENU_CONF: {
            // 配置字号
            fontSize: 'small',
            // 配置上传图片
            uploadImage: "/api/load",
        }
    }

    useEffect(()=>{
        setHtml(value);
    }, [value])

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100, width: 1200 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={value}
                    onCreated={setEditor}
                    onChange={editor => {
                        onChange&&onChange(editor.getHtml())
                    }}
                    mode="default"
                    style={{ height: '300px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default EditorTemp;