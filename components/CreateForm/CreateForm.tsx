'use client';

import { createApplication } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const labelClassName =
  'block text-[11px] font-medium uppercase tracking-wide text-slate-500';

const inputClassName =
  'mt-1 w-full border-0 border-b border-slate-300 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-0';

const textareaClassName = `${inputClassName} min-h-24 resize-none`;

const errorClassName = 'mt-1 text-xs text-red-600';

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? 'Failed to create application.';
  }
  return 'Something went wrong. Please try again.';
}

const validationSchema = Yup.object().shape({
  company: Yup.string().max(30).min(2).required(),
  position: Yup.string().max(40).min(5).required(),
  status: Yup.string()
    .required()
    .oneOf(['applied', 'interview', 'takehome', 'offer', 'rejected']),
  appliedAt: Yup.string().max(32).required(),
  source: Yup.string().required(),
  salary: Yup.string().required().trim(),
  notes: Yup.string().max(250),
});

export interface FormValues {
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'takehome' | 'offer' | 'rejected';
  appliedAt: string;
  jobUrl: string;
  salary: string;
  notes: string;
  
}

const ApplicationValues: FormValues = {
  company: '',
  position: '',
  status: 'applied',
  appliedAt: '',
  jobUrl: '',
  salary: '',
  notes: '',
};

export default function CreateForm() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createApplication,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      handleClose();
    },
  });
  function handleClose() {
    router.push('/');
  }

  function handleSubmit(values: FormValues) {
    mutation.mutate({
      company: values.company,
      role: values.position,
      status: 'applied',
      workFormat: 'onsite',
      jobUrl: values.jobUrl,
      notes: values.notes,
      appliedAt: values.appliedAt,
      salary: values.salary,
    });
  }
  return (
    <Formik
      initialValues={ApplicationValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Add application
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelClassName}>
              Company
            </label>
            <Field
              id="company"
              type="text"
              name="company"
              placeholder="Spotify"
              className={inputClassName}
            />
            <ErrorMessage name="company" component="p" className={errorClassName} />
          </div>

          <div>
            <label htmlFor="position" className={labelClassName}>
              Position
            </label>
            <Field
              id="position"
              type="text"
              name="position"
              placeholder="Frontend developer"
              className={inputClassName}
            />
            <ErrorMessage name="position" component="p" className={errorClassName} />
          </div>

          <div>
            <label htmlFor="status" className={labelClassName}>
              Status
            </label>
            <Field
              id="status"
              type="text"
              name="status"
              placeholder="applied"
              className={inputClassName}
            />
            <ErrorMessage name="status" component="p" className={errorClassName} />
          </div>

          <div>
            <label htmlFor="appliedAt" className={labelClassName}>
              Applied date
            </label>
            <Field
              id="appliedAt"
              type="date"
              name="appliedAt"
              placeholder="dd.mm.yyyy"
              className={inputClassName}
            />
            <ErrorMessage name="appliedAt" component="p" className={errorClassName} />
          </div>

          <div>
            <label htmlFor="jobUrl" className={labelClassName}>
              Job posting link.
            </label>
            <Field
              id="jobUrl"
              type="text"
              name="jobUrl"
              placeholder="https://"
              className={inputClassName}
            />
            <ErrorMessage name="jobUrl" component="p" className={errorClassName} />
          </div>

          <div>
            <label htmlFor="salary" className={labelClassName}>
              Salary (SEK)
            </label>
            <Field
              id="salary"
              type="text"
              name="salary"
              placeholder="Optional"
              className={inputClassName}
            />
            <ErrorMessage name="salary" component="p" className={errorClassName} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className={labelClassName}>Notes</label>
            <Field
              as="textarea"
              id="notes"
              name="notes"
              className={textareaClassName}
            />
            <ErrorMessage name="notes" component="p" className={errorClassName} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save
          </button>
        </div>

        {mutation.isError && (
          <p className="mt-3 text-center text-xs text-red-600">
            {getErrorMessage(mutation.error)}
          </p>
        )}
      </Form>
    </Formik>
  );
}
