import React, { useEffect, useMemo } from 'react';
import { createForm, Form as FormCore } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards
} from '@formily/antd';
import { Card, Slider, Rate, Button } from 'antd';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate
  }
});

interface FormilyRenderProp {
  formSchema: StoreValue;
  onSubmit?: (value: StoreValue) => void;
  showSubmit?: boolean;
  defaultValue?: StoreValue;
  form?: FormCore;
  scope?: Record<string, StoreValue>;
  submitButtonProp?: React.ComponentProps<typeof Button>;
  submitText?: string;
}

export default ({
  form: formProp,
  formSchema,
  onSubmit,
  showSubmit = false,
  defaultValue,
  scope = {},
  submitButtonProp = {},
  submitText = '保存'
}: FormilyRenderProp) => {
  const form = useMemo(() => formProp ?? createForm(), [formProp]);

  const submitForm = async () => {
    const value = await form.submit();
    onSubmit?.(value);
  };

  useEffect(() => {
    form.setValues(defaultValue);
  }, [defaultValue]);

  return (
    <Form form={form} {...formSchema.form}>
      <SchemaField scope={scope} schema={formSchema.schema}></SchemaField>
      {showSubmit && (
        <Button onClick={submitForm} className="mt-4" type="primary" {...submitButtonProp}>
          {submitText}
        </Button>
      )}
    </Form>
  );
};
