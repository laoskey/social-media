import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { theme } from "@/constants/theme";

interface RichTextEditorProps {
  editorRef: React.RefObject<any>;
  onChange: (body: any) => void;
}
function RichTextEditor({ editorRef, onChange }: RichTextEditorProps) {
  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
          actions.setStrikethrough,
          actions.removeFormat,
          actions.setBold,
          actions.setItalic,
          actions.insertOrderedList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
          actions.insertImage,
          actions.insertBulletsList,
          actions.insertLink,
          actions.keyboard,
          actions.setUnderline,
          actions.insertVideo,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>,
          [actions.heading4]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>H4</Text>,
        }}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        selectedIconTint={theme.colors.primaryDark}
        editor={editorRef}
        disabled={false}
      />
      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.containerStyle}
        placeholder="What's your mind?"
        onChange={onChange}
      />
    </View>
  );
}

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
  listStyle: {},
  rich: {},
  containerStyle: {},
});
